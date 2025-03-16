interface InputFieldProps {
    label: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const InputField = ({ label, type = "text", name, value, onChange }: InputFieldProps) => {
    return (
      <div className="relative w-full group">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="input input-bordered w-full bg-transparent text-gray-800 peer
          autofill:bg-white autofill:text-gray-800"
        />
        <label
          className={`absolute left-3 px-1 bg-white text-gray-500 transition-all
          ${value ? "top-[-12px] text-xs text-sky-500" : "top-3 text-base text-gray-400"}
          peer-focus:top-[-12px] peer-focus:text-xs peer-focus:text-sky-500 peer-focus:bg-white
          peer-autofill:top-[-12px] peer-autofill:text-xs peer-autofill:text-sky-500 peer-autofill:bg-white`}
        >
          {label}
        </label>
      </div>
    );
  };
  
  export default InputField;
  