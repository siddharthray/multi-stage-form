export default interface Profile {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    location: boolean,
    git: string,
    resume: object,
    uploadCover: object | null
    about: string

}
