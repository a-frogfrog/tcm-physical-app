import {
  FORM_THERAPY_TABS,
  useFormTherapyStore,
  type FormTherapyTab,
} from './therapyStore';

export const useFormTherapy = () => {
  const tabs = Object.keys(FORM_THERAPY_TABS);
  const {
    activeTab,
    setActiveTab,
    isSuccess,
    setIsSuccess,
    isSubmitting,
    setIsSubmitting,
  } = useFormTherapyStore();

  // 导航到下一个标签页
  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    console.log(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1] as FormTherapyTab);
    }
  };

  // 导航到上一个标签页
  const goToPrevTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1] as FormTherapyTab);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsSuccess(true);
  };

  return {
    tabs,
    activeTab,
    isSubmitting,
    isSuccess,
    setActiveTab,
    goToNextTab,
    goToPrevTab,
    handleSubmit,
  };
};
