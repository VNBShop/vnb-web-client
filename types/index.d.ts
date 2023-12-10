import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth/next"

// declare namespace google {
//   export namespace accounts {
//     export namespace id {
//       function initialize(config: any): void
//       function renderButton(element: HTMLElement, option: any): void
//       function promt(): void
//     }
//   }
// }

type DataResponse = {
  data: {
    metadata: TData & { message?: string }
    success: boolean
  }
}

type DataError = {
  response: {
    data: {
      metadata: TData & { message?: string }
      success: boolean
    }
  }
}
