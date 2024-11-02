export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline
          ? "border border-[#4C5D7E] bg-transparent text-[#4C5D7E]"
          : "bg-[#4C5D7E] text-white"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold hover:bg-[#3A4C68] transition-colors duration-200 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline ? "text-[#4C5D7E]" : "text-white"}`}>
            {text}
          </span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
