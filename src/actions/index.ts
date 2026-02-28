// src/actions/index.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

export const server = {
  getEstimate: defineAction({
    input: z.object({
      fullName: z.string().min(2, { message: "Name is too short" }),
      phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
      email: z.string().email(), 
      address: z.string().min(5, { message: "Please provide a full address" }),
    }),
    handler: async (input, context) => {
      // Logic for Cloudflare (e.g., sending to a KV store or email API)
      console.log("Estimate request received:", input);
      return { success: true, message: "Estimate request received!" };
    }
  })
}
