"use client"
import { useState } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            const resposne = await axios.post("/api/stores", values)
            
            window.location.assign(`${resposne.data.id}`)
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        < Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="E-commerce"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex item-center justify-end">
                                <Button
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                    disabled={loading}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal >
    )
}