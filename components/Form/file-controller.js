import { useCallback, useState, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { toast } from "@/components/ui/use-toast"

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function FileController({ name, control, defaultValue, render }) {
  const inputRef = useRef(null);
  const { setValue } = useFormContext();
  const { field } = useController({ name, control });
  const [base64, setBase64] = useState(defaultValue.name);

  const onChange = useCallback(async (event) => {
    if (event.target.files?.[0]) {
      const MAX_IMAGE_SIZE = 2097152;
      const rawFile = event.target.files[0];
      const finalBase64 = await getBase64(rawFile);

      if (rawFile.size > MAX_IMAGE_SIZE) {
        return toast({
          title: "Image rejected",
          description: <p>The image must be less than 2MB in size. Please try again!</p>,
        })
      }
      
      setBase64(finalBase64);
      field.onChange(finalBase64);
    }
  }, []);

  return render({
    field: {
      type: 'file',
      accept: "image/*",
      name,
      onChange,
      ref: (instance) => {
        field.ref(instance);
        inputRef.current = instance;
      },
    },
    base64,
    select: () => inputRef.current?.click(),
    remove: () => {
      setValue(name, null);
      setBase64(null);
    },
  });
}
