"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
//import { useRouter } from "next/router";
import { useState } from "react";
import { FormError } from "./auth/form-error";
import { FormSuccess } from "./auth/form-success";
import create_startup from "../../actions/create_startup";

const VALID_CATEGORIES = [
  "TECH",
  "HEALTH",
  "FINANCE",
  "EDUCATION",
  "OTHER",
] as const;

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title should be at least 2 characters" }),
  description: z
    .string()
    .min(2, { message: "Description should be at least 2 characters" })
    .max(100, { message: "Description should be at most 100 characters" }),
  category: z.enum(VALID_CATEGORIES, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  imageurl: z.string().optional(),
  pitch: z
    .string()
    .min(2, { message: "Pitch should be at least 2 characters" })
    .max(10000, { message: "Pitch should be at most 10000 characters" }),
});

//type Category = typeof VALID_CATEGORIES[number];

export const CreateStartupForm = () => {
  //const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "OTHER",
      imageurl: "",
      pitch: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError("");
    setSuccess("");

    create_startup(values)
      .then((res) => {
        if (res.success) {
          setSuccess(res.success);
          form.reset();
        }
        if (res.error) {
          setError(res.error);
        }
      })
      .catch((error) => {
        setError("Something went wrong");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} required />
              </FormControl>
              <FormDescription>
                This is the title of your startup
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} required />
              </FormControl>
              <FormDescription>
                This is the description of your startup. Keep it between 2 and
                100 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {VALID_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Select your startup category</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pitch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Pitch</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Description"
                  {...field}
                  required
                />
              </FormControl>
              <FormDescription>
                This is the pitch of your startup. Keep it between 2 and 10000
                characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageurl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Image URL</FormLabel>
              <FormControl>
                <Input
                  type="https://example.com/image.jpg"
                  placeholder="https://example.com/image.jpg"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a URL for your startup&apos;s image
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};
export default CreateStartupForm;
