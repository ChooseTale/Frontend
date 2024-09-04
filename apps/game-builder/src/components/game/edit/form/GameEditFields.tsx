import { useEffect } from "react";
import type { useForm } from "react-hook-form";
import "@toast-ui/editor/dist/toastui-editor.css";
import ThemedInputField from "@themed/ThemedInputField";
import type { PageType } from "@/interface/customType";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import MaxLengthText, {
  setMaxLengthOptions,
} from "@/components/common/form/MaxLengthText";
import PageContentEditor from "@/components/common/editor/DescriptionEditor";

const MAX_LENGTH = {
  abridgement: 50,
  description: 3000,
} as const;

export default function GameEditFields({
  ...useFormProps
}: ReturnType<typeof useForm<PageType>>) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormProps;

  const descriptioContentLen = watch("description")?.length || 0;
  const descriptionMaxLengthOptions = setMaxLengthOptions(
    descriptioContentLen,
    MAX_LENGTH.description,
    20
  );

  const emptyInitialValue = "<p></p>";
  const handleEditorChange = (content: string) => {
    setValue("description", content, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    register("description", {
      required: "페이지 내용을 입력해주세요",
      maxLength: {
        value: MAX_LENGTH.description,
        message: `페이지 내용을 ${formatNumberWithCommas(MAX_LENGTH.description)}자 내로 입력해주세요`,
      },
    });
  }, [register]);

  return (
    <>
      <ThemedInputField
        labelText="요약"
        placeholder="페이지를 요약해보세요"
        maxLength={MAX_LENGTH.abridgement}
        {...register("abridgement", {
          required: "페이지 요약을 입력해주세요",
          maxLength: {
            value: MAX_LENGTH.abridgement,
            message: `요약을 ${MAX_LENGTH.abridgement}자 내로 입력해주세요`,
          },
        })}
        autoComplete="off"
        errMsg={errors.abridgement?.message ?? ""}
      />
      <p className="text-xs text-right text-gray-400 h-0 -translate-y-2">
        요약은 플레이어에게 보이지 않습니다.
      </p>

      <MaxLengthText {...descriptionMaxLengthOptions} className="-top-1" />
      <PageContentEditor
        initialValue={watch("description") || emptyInitialValue}
        onChange={handleEditorChange}
        errMsg={errors.description?.message}
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description?.message}</p>
      )}
    </>
  );
}
