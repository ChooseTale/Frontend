import { UseFormReturn } from "react-hook-form";
import { CreateGameReqDto } from "@choosetale/nestia-type/lib/structures/CreateGameReqDto";
import ThemedInputField from "@themed/ThemedInputField";
import ThemedTextareaField from "@themed/ThemedTextareaField";

type GameFieldsProps = UseFormReturn<CreateGameReqDto>;

export default function GameCreateFields({ ...useFormProps }: GameFieldsProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormProps;

  const formatNumberWithCommas = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const titleLen = watch("title")?.length || 0;
  const titleLenString = formatNumberWithCommas(titleLen);
  const MAX_TITLE_LEN = 30;
  const lessThan3LeftForTitle = MAX_TITLE_LEN - titleLen < 3;

  const pageContentLen = watch("pageOneContent")?.length || 0;
  const pageContentLenString = formatNumberWithCommas(pageContentLen);
  const MAX_PAGE_LEN = 2000;
  const lessThan100LeftForPageContent = MAX_PAGE_LEN - pageContentLen < 100;

  return (
    <>
      <div>
        <p
          className={`relative h-0 top-7 px-1 text-xs text-right ${
            lessThan3LeftForTitle ? "text-red-500" : ""
          }`}
        >
          {titleLenString} / {MAX_TITLE_LEN}
        </p>
      </div>
      <ThemedInputField
        labelText="게임"
        placeholder="게임 이름 (1~30)"
        {...register("title", {
          required: "게임의 이름을 입력해주세요",
          maxLength: {
            value: 30,
            message: "게임 이름을 30자 내로 입력해주세요",
          },
        })}
        errMsg={errors["title"]?.message ?? ""}
        className={lessThan3LeftForTitle ? "text-red-500" : ""}
      />

      <div>
        <p
          className={`relative h-0 top-6 px-1 text-xs text-right ${
            lessThan100LeftForPageContent ? "text-red-500" : ""
          }`}
        >
          {pageContentLenString} / {formatNumberWithCommas(MAX_PAGE_LEN)}
        </p>
      </div>
      <ThemedTextareaField
        labelText="이야기의 시작"
        placeholder="첫 페이지의 내용 (2,000자 이내)"
        rows={12}
        {...register("pageOneContent", {
          required: "첫 페이지의 내용을 작성해주세요",
          maxLength: {
            value: 2000,
            message: "2,000자 내로 입력해주세요",
          },
        })}
        errMsg={errors["pageOneContent"]?.message}
        className={lessThan100LeftForPageContent ? "text-red-500" : ""}
      />
    </>
  );
}
