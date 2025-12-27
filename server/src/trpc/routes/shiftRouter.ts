import {router, protectedProcedure, publicProcedure} from "../trpc";
import {z} from "zod";
import {Shift} from "../../models/Shift.model";

export const shiftRouter = router({
  createNewShift: protectedProcedure.input(
    z.object({
      employeeId: z.string().min(1),
      startTime: z.date().min(1),
      endTime: z.date().min(1),
      data: z.date().min(1)
    })
  ).mutation(async ({ctx, input}) => {
    const {company, userId, role} = ctx;
    if (!input.employeeId) {
      throw new Error("You must assign an employee!");
    }

    if (role !== "OWNER" || !userId || !company) {
      throw new Error("Unauthorized")
    }

    try {
      const newShift = await Shift.create({
        companyId: company._id,
        ...input
      });

      return newShift;
    } catch (e) {
      console.error(e);
      console.log("Failed to create new shift!");
      throw new Error("Failed to create new shift!");
    }

  }),
  getAllShifts: publicProcedure.input(
    z.object({
      companyId: z.string().min(1),
      employeeId: z.string().min(1)
    })
  )
    .query(async ({ctx, input}) => {
      const {companyId,} = input;

      if (!companyId) {
        throw new Error("Please login!")
      }
      try {
        const allShifts = await Shift.find({companyId:companyId})
        return allShifts;
      } catch (e) {
        console.error(e);
        console.log("Server error!");
        throw new Error("Failed to fetch shift!");
      }
    })
})