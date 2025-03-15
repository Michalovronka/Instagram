

export default function DownloadSection() {
  return (
    <>
      <div className="text-center m-4">Stáhněte si aplikaci.</div>

      <div className="flex justify-between gap-2 mx-16 h-10">
        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=cs&pli=1">
          <img
            className="h-full"
            src="https://static.cdninstagram.com/rsrc.php/v4/yL/r/ZnkTJtGew6t.png"
          />
        </a>
        <a href="https://apps.microsoft.com/detail/9nblggh5l9xt?hl=en-US&gl=US">
          <img
            className="h-full"
            src="https://static.cdninstagram.com/rsrc.php/v4/yy/r/IB9MrnOOUr3.png"
          />
        </a>
      </div>
    </>
  );
}
