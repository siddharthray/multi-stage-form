

export default function formValidation(req, res, next) {
    const { firstName, email, git, resume, about } = req.body;

    if (!firstName ||
        !email ||
        !about ||
        !resume ||
        !git) {
        return res.status(400).json({ err: "Validation failed" })
    }
    next();
}
