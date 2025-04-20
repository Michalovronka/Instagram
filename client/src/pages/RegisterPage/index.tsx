import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

//TODO: Make erorrs from backend work ( so they go into info)
//      Facebook login (no)
//      Make downolad app into component and also the bar tht is on the bottom


export default function RegisterPage() {
  const navigate = useNavigate();
  const [info, setInfo] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    pfpFile: File | null;
    userName: string;
    displayName: string;
    email: string;
    password: string;
  }>({
    pfpFile: null,
    userName: "",
    displayName: "",
    email: "",
    password: "",
  });

  const postForm = async () => {
    if (
      !formData.userName ||
      !formData.displayName ||
      !formData.email ||
      !formData.password
    ) {
      setInfo("Doplňte všechny pole");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("userName", formData.userName);
    formDataToSend.append("displayName", formData.displayName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.pfpFile) {
      formDataToSend.append("pfpFile", formData.pfpFile);
    }

    try {
      await api.post("/user/registration", formDataToSend);
      await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      navigate("/");
    } catch (err: unknown) {
      const error = err as {
        message?: string;
      }
      setInfo(error.message || "Login failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log("Selected file:", e.target.files[0]);
      setFormData({
        ...formData,
        pfpFile: e.target.files[0], 
      });
    }
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    postForm();
  };

  return (
    <>
      <div className="m-auto  w-[21.5rem]  mt-3 ">
        <div className="h-[775px] border border-slate-300 text-slate-500">
          <div className="p-7 text-5xl text-black m-auto text-center">
            Instagram
          </div>
          <div className="px-10 ">
            <p className="text-center font-semibold mb-16">
              Zaregistrujte se, abyste si mohli prohlížet fotky a videa od
              přátel.
            </p>
            <form
              encType="multipart/form-data"
              className="flex flex-col gap-2 text-xs text-black placeholder-slate-500"
            >
              <input
                type="text"
                name="email"
                required
                placeholder="Email"
                onChange={handleChange}
                className="border border-slate-300 rounded px-2 py-2.5 bg-slate-100"
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Heslo"
                onChange={handleChange}
                className="border border-slate-300 rounded px-2 py-2.5 bg-slate-100"
              />

              <input
                type="text"
                name="userName"
                required
                placeholder="Uživatelské jméno"
                onChange={handleChange}
                className="border border-slate-300 rounded px-2 py-2.5 bg-slate-100"
              />
              <input
                type="text"
                name="displayName"
                required
                placeholder="Jméno"
                onChange={handleChange}
                className="border border-slate-300 rounded px-2 py-2.5 bg-slate-100"
              />

              <div className="border mb-2 px-2 py-2.5 border-slate-300 rounded bg-slate-100 text-slate-500">
                <p className="mb-2">Profilový Obrázek: (nepovinný)</p>
                <input
                  className="hover:bg-blue-500 hover:cursor-pointer w-full bg-sky-400 text-white font-medium text-sm rounded-md p-1.5"
                  type="file"
                  name="pfpFile"
                  onChange={handleImageChange}
                />
              </div>

              <div className="text-xs px-2 text-center text-slate-500">
                <p>
                  Lidé, kteří používají naše služby, možná nahráli vaše
                  kontaktní údaje na Instagram.{" "}
                  <span className="text-blue-950">Další informace</span>
                </p>
                <br />
                <p className="text-xs px-2 text-center">
                  Registrací vyjadřujete svůj souhlas s našimi smluvními
                  podmínkami. Přečtěte si v našich Zásadách ochrany osobních
                  údajů, jak sbíráme, používáme a sdílíme vaše údaje. V Zásadách
                  používání souborů cookie se zase dozvíte, jak používáme
                  soubory cookie a podobnou technologii.
                </p>
              </div>
              <button
                onClick={handlePost}
                className="hover:bg-blue-500 bg-sky-400 text-white font-medium text-sm rounded-md p-1.5 mt-1.5"
              >
                Zaregistrovat se
              </button>
              {info && (
                <p className="text-red-600 text-center text-sm">{info}</p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-3 py-5 text-sm text-center border border-slate-300">
          <p>Máte účet?</p>
          <p className="text-sky-400 font-medium">Přihlaste se</p>
        </div>

        <div>
          <div className="text-center text-sm m-4">Stáhněte si aplikaci.</div>
          <div className="flex justify-between gap-2 px-12 h-10">
            <a href="">
              <img
                className="h-full"
                src="https://static.cdninstagram.com/rsrc.php/v4/yL/r/ZnkTJtGew6t.png"
              />
            </a>
            <a href="">
              <img
                className="h-full"
                src="https://static.cdninstagram.com/rsrc.php/v4/yy/r/IB9MrnOOUr3.png"
              />
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
