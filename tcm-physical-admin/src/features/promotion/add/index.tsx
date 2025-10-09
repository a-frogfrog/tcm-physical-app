import { PageTitle } from '#/components/common';
import PromotionForm from './PromotionForm';

export default function PromotionAdd() {
  return (
    <>
      <PageTitle
        title='创建新推广'
        desc='填写以下信息，创建中医理疗服务的推广活动，吸引更多客户参与'
      />
      <PromotionForm />
    </>
  );
}
