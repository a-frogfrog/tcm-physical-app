import { toast } from 'sonner';

const fetchImage = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const usePromotionEvents = () => {
  const link = document.createElement('a');

  const handleSaveImage = async (url: string) => {
    const imageUrl = await fetchImage(url);
    link.href = imageUrl;
    link.download = 'promotion-image.jpg';
    link.click();
    toast.success('图片保存成功');
  };

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success('复制成功');
  };

  return {
    handleSaveImage,
    handleCopy,
  };
};
