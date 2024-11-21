"use client";

import MDEditor, { commands } from '@uiw/react-md-editor';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { DOMAIN } from "@/utils/constant";
import { z } from "zod";
import { formSchema } from "@/utils/zodValidition";
import axios from "axios";
import { StartupType } from "@/utils/type";


export default function StartupForm({ authorid }: { authorid: number }) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("");

  const { toast } = useToast()

  const router = useRouter()

  async function hendleFormSubmit(prevState: { error: string, status: string } | undefined, formData: FormData) {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        image: formData.get('link') as string,
        pitch: pitch
      }

      await formSchema.parseAsync(formValues)

      const response = await axios.post(`${DOMAIN}/api/startup`, { ...formValues, authorid })
      const newStartup = await response.data as StartupType;


      router.replace(`${DOMAIN}/startup/${newStartup.id}`)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors
        setErrors(fieldErrors as unknown as Record<string, string>)

        toast({
          title: 'Error',
          description: "please check your inputs and try again",
          variant: "destructive",
          style: {
            backgroundColor: "#002200c4",
            color: "white"
          }
        })

        console.log(prevState)

        return { ...prevState, error: "validation Field", status: "ERROR" }

      }
      toast({
        title: 'Error',
        description: "An Unexpected error has occurred",
        variant: "destructive"
      })

      return { ...prevState, error: "An Unexpected error has occurred", status: "ERROR" }
    }
  }

  const [state, formAction, isPending] = useActionState(hendleFormSubmit, {
    error: "",
    status: "INITIAL"
  })
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          type="text"
          placeholder="Startup Title"
          required
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">Description</label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          placeholder="Startup Description"
          maxLength={500}
          required
        />
        {errors.description && <p className="startup-form_error">{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">Category</label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          type="text"
          placeholder="Startup Category (Tech, Health, Education...)"
          required
        />
        {errors.category && <p className="startup-form_error">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">Image Url</label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          type="url"
          placeholder="Startup Image Url"
          required
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">Pitch</label>
        <MDEditor
          value={pitch}
          onChange={(e) => setPitch(e as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem it solves"
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending ? 'Submiting...' : 'Submit Your Startup'}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  )
}