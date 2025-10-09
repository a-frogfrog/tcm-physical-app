import { toast } from 'sonner';

const fetchImage = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export const usePromotionEvents = () => {
  const link = document.createElement('a');

  const handleSaveImage = (url: string) => {
    fetchImage(url).then((imageUrl) => {
      link.href = imageUrl;
      link.download = 'promotion-image.jpg';
      link.click();
    });
    toast.success('图片保存成功');
  };

  const handleCopy = async () => {
    toast.success('复制成功');
    await navigator.clipboard.writeText(link.href);
  };

  return {
    handleSaveImage,
    handleCopy,
  };
};

export const useFetchPromotionData = () => {
  const imageUrl =
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80';
  return {
    imageUrl,
  };
};
