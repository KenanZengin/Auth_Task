"use client"

import {SessionProvider} from "next-auth/react"

//Auth paketini tüm componentlere sarmalamamız gerekiyor.Bu işlemi bu sayfada yapıyoruz ana Layout sayfasında yapmamız çok performanslı olmaz çünkü "use client" 'ı tüm sayfalara eklemiş oluruz.
const AuthProvider = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider