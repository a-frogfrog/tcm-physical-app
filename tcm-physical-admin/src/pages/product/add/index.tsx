import { PageTitle } from '#/components/common';
import AddForm from './AddForm';

export default function ProductAdd() {
  return (
    <div>
      <PageTitle
        title='新增理疗产品'
        desc='添加新的中医理疗服务项目，完善您的服务体系'
      />
      <section className='my-6'>
        <AddForm />
      </section>
    </div>
  );
}
