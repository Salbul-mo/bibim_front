import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, "이메일을 입력해주세요")
    .email("유효한 이메일 형식이 아닙니다"),
  password: z.string()
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/, 
      "영문, 숫자, 특수문자를 포함해야 합니다"),
  academyId: z.string().uuid("유효한 학원 ID가 아닙니다")
});

export type LoginFormValues = z.infer<typeof loginSchema>; 