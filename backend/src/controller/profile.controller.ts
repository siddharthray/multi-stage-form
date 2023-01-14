import Profile from '../model/from-data.interface';


export const profileController = (req, res) => {

    const { firstName, lastName, email, phone, location, git, resume, uploadCover = null, about } = req.body;
    let formObject: Profile = {
        firstName,
        lastName,
        email,
        phone,
        location,
        git,
        resume,
        uploadCover,
        about
    }
    return res.status(201).json({ data: formObject, msg: "submitted" })
}