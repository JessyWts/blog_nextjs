import { title } from "process";
import * as Yup from "yup";

export const schemaArticle = Yup.object().shape({
    title: Yup.string().required("Le titre est requis"),
    description: Yup.string().required("La description est requise"),
    image: Yup.string()
});