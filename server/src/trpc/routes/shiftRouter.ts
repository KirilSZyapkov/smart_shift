import {protectedProcedure, publicProcedure, router} from "../trpc";
import {z} from "zod";
import {Shift} from "../../models/Shift.model";
import {AppError} from "../../errors/AppError";
import {ErrorCode} from "../../errors/errorCodes";

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
      throw new Error("You must assign an employees!");
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
      throw new AppError(
        "Failed to create new shift",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      )
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
        throw new AppError(
          "You must be logged in!",
          401,
          ErrorCode.UNAUTHORIZED
        )
      }
      try {
        const allShifts = await Shift.find({companyId:companyId})
        return allShifts;
      } catch (e) {
        throw new AppError(
          "Failed to load all shifts!",
          500,
          ErrorCode.INTERNAL_SERVER_ERROR
        )
      }
    })
})