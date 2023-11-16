export const emailValidation=(email)=>{
    const emailRegex = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,3})$/
    return emailRegex.test(email)
}

export const nameValidation=(name)=>{
    const nameRegex = /^[A-Za-z ]+$/
    if(name.length<3)
    {
        return {
            isError:true,
            message:"Name length should be greater than 3"
        }
    }
    if(name.length>50)
    {
        return {
            isError:true,
            message:"Name length should not be greater than 50"
        }
    }
    if(name[0]===" ")
    {
        return {
            isError:true,
            message:"First character can not be blank space"
        }
    }
    if(!nameRegex.test(name))
    {
        return {
            isError:true,
            message:"Name can only contain alphabets"
        }
    }
    return {
        isError:false,
        message:""
    }

}