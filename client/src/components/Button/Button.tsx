type ButtonProps ={
    text:string
}
export default function Button(props:ButtonProps) {
  return (
    <>
        <button className="bg-slate-200 text-sm font-semibold rounded-lg py-1.5 px-4">
            {props.text}
        </button>
    </>
  )
}
