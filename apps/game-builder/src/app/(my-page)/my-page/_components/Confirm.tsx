import Button from "@/components/common/button/Button";

export default function ConfirmModal({
  isOpen,
  title,
  description,
  buttonText,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  title: string;
  description: string;
  buttonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center ${isOpen ? "block" : "hidden"}`}
    >
      <button
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 cursor-default"
        type="button"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-[340px] mx-10 bg-grey-900 p-5 pt-8 rounded-xl text-center">
        <h2 className="text-title2 font-semibold mb-6">{title}</h2>
        <p
          className="text-body mb-8 grey-100 font-thin"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="h-12 flex justify-end gap-2">
          <Button
            onClick={onCancel}
            buttonText="취소하기"
            isPlaying
            className="w-1/2 shrink-0"
          />
          <Button
            onClick={onConfirm}
            buttonText={buttonText}
            className="w-1/2 shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
