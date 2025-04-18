type ButtonProps ={
    text:string
    onClick? : ()=>void;
}
export default function Button(props:ButtonProps) {
  return (
    <>
        <button onClick={props.onClick} className="bg-slate-200 text-sm font-semibold rounded-lg py-2 px-4">
            {props.text}
        </button>
    </>
  )
}
