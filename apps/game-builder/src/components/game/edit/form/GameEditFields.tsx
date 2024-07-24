import { useForm } from "react-hook-form";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import { Page } from "@choosetale/nestia-type/lib/structures/Page";

const MAX_LENGTH = {
  abridgement: 50,
  description: 3000,
} as const;

export default function GameEditFields({
  ...useFormProps
}: ReturnType<typeof useForm<Page>>) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormProps;

  const pageContentLen = watch("description").length || 0;
  const pageContentLenString = formatNumberWithCommas(pageContentLen);
  const lessThan100LeftForPageContent =
    MAX_LENGTH.description - pageContentLen < 100;

  return (
    <>
      <ThemedInputField
        labelText="요약"
        placeholder="페이지를 요약해보세요"
        maxLength={50}
        {...register("abridgement", {
          required: "페이지 요약을 입력해주세요",
          maxLength: {
            value: 50,
            message: "요약을 50자 내로 입력해주세요",
          },
        })}
        autoComplete="off"
        errMsg={errors["abridgement"]?.message ?? ""}
      />
      <p className="text-xs text-right text-gray-400 h-0 -translate-y-2">
        요약은 플레이어에게 보이지 않습니다.
      </p>

      <div>
        <p
          className={`relative h-0 top-4 px-1 text-xs text-right ${
            lessThan100LeftForPageContent ? "text-red-500 border-red-500" : ""
          }`}
        >
          {pageContentLenString} /{" "}
          {formatNumberWithCommas(MAX_LENGTH.description)}
        </p>
      </div>
      <ThemedTextareaField
        labelText="내용"
        placeholder="페이지의 내용을 입력하세요"
        rows={10}
        maxLength={MAX_LENGTH.description}
        {...register("description", {
          required: "페이지 내용을 입력해주세요",
          maxLength: {
            value: MAX_LENGTH.description,
            message: "페이지 내용을 3,000자 내로 입력해주세요",
          },
        })}
        autoComplete="off"
        errMsg={errors["description"]?.message}
        className={lessThan100LeftForPageContent ? "text-red-500" : ""}
      />
    </>
  );
}
