import {router, publicProcedure, protectedProcedure} from "../trpc";
import {z} from "zod";
import {User} from "../../models/User.model";
import {Company} from "../../models/Company.model";


export const userRouter = router({
  createNewUser: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "Firs name is required!"),
        secondName: z.string().min(1, "Second name is required!"),
        email: z.string().email().min(1, "Email is required!"),
        companyName: z.string().min(1, "Company name is required!")
      })
    )
    .mutation(async ({ctx, input}) => {
      const {userId} = ctx;

      if (!userId) {
        throw new Error("Unauthorized");
      }


      let user = await User.findOne({clerkUserId: userId});

      if (user) {
        return user;
      }

      try {
        const company = await Company.create({
          companyName: input.companyName,
          ownerClerkId: userId,
          slug: input.companyName.toLocaleLowerCase(),
          stripeCustomerId: "",
        });

        user = await User.create({
          clerkUserId: userId,
          firstName: input.firstName || "User",
          secondName: input.secondName || "",
          email: input.email,
          companyId: company._id
        });

        return user;

      } catch (error) {
        console.error(error);
        console.log("Failed to sync user!");
        throw new Error("Failed with sincing user");
      }
    }),

  getCurrentUser: protectedProcedure.query(async ({ctx}) => {
    const {userId} = ctx;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const currentUser = await User.findOne({clerkUserId: userId});

    if (!currentUser) {
      throw new Error("User not found");
    }

    return currentUser;
  })

})