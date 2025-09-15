import { Button } from '#/components/ui';

type FormActionsProps = {
  onSubmit: () => void;
  onPreview: () => void;
  onSaveDraft: () => void;
};

const FormActions = ({
  onSubmit,
  onPreview,
  onSaveDraft,
}: Partial<FormActionsProps>) => {
  return (
    <div className='flex gap-3'>
      <Button
        onClick={onSaveDraft}
        type='button'
        variant='outline'
        className='transition-all'>
        保存草稿
      </Button>
      <Button
        onClick={onPreview}
        type='button'
        variant='outline'
        className='transition-all'>
        预览效果
      </Button>
      <Button
        onClick={onSubmit}
        type='submit'
        className='bg-primary hover:bg-primary/90 transition-all'>
        确认创建
      </Button>
    </div>
  );
};

export default FormActions;
