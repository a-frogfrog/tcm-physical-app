import { CommissionCard } from './CommissionCard';

export default function CommissionCenter() {
  return (
    <div className='mx-auto max-w-md space-y-4 p-6'>
      <CommissionCard
        title='累计佣金'
        amount='¥12,580'
        description='已结算 + 待结算'
        variant='primary'
      />

      <CommissionCard
        title='可提现佣金'
        amount='¥3,250'
        description=''
        variant='success'
        action='立即提现'
      />

      <CommissionCard
        title='待结算佣金'
        amount='¥1,280'
        description='预计7个工作日后可提现'
        variant='default'
      />
    </div>
  );
}
