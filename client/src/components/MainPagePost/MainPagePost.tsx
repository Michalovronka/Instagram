function MainPagePost() {
  return (
    <>
      <div className="m-auto w-main-content-posts my-3">
        <div className="flex items-center">
          <img
            src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
            className="max-w-12 rounded-full p-2"
            alt=""
          />
          <div className="text-sm font-medium"> Creator 1</div>
        </div>
        <img
          src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
          className="rounded-sm"
        ></img>

        <div className="text-sm border-b border-b-slate-300">
          <div className="flex gap-5 py-2">
            <div className="">i</div>
            <div className="">e</div>
            <div className="">o</div>
            <div className="ml-auto">o</div>
          </div>
          <div className="font-medium">53,910 likes</div>
          <div className="my-1">
            <span className="font-medium">Creator 1 </span> Doslova kom en t
          </div>
          <div className="text-slate-500">View all 192 comments</div>
          <div className="text-slate-500 mt-1 mb-3">Add a comment...</div>{/*Make this a form for comment */}
        </div>
      </div>
    </>
  );
}

export default MainPagePost;
