import {
  Card,
  CardContent,
  Input,
  Label,
  Textarea,
  Button,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
} from '#/components/ui';

import { CalendarIcon } from 'lucide-react';

const CustomerForm = ({ className }: { className?: string }) => {
  return (
    <section className={`mx-auto max-w-5xl space-y-6 ${className}`}>
      {/* 基本信息 */}
      <Card className='rounded-2xl shadow-sm'>
        <CardContent className='space-y-6 p-6'>
          <h2 className='text-brown-700 flex items-center space-x-2 text-lg font-semibold'>
            <span>👤</span>
            <span>基本信息</span>
          </h2>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label>客户姓名 *</Label>
              <Input placeholder='请输入客户姓名' />
            </div>
            <div className='space-y-2'>
              <Label>性别</Label>
              <RadioGroup defaultValue='男' className='flex space-x-4'>
                <div className='flex items-center space-x-1'>
                  <RadioGroupItem value='男' id='male' />
                  <Label htmlFor='male'>男</Label>
                </div>
                <div className='flex items-center space-x-1'>
                  <RadioGroupItem value='女' id='female' />
                  <Label htmlFor='female'>女</Label>
                </div>
                <div className='flex items-center space-x-1'>
                  <RadioGroupItem value='保密' id='secret' />
                  <Label htmlFor='secret'>保密</Label>
                </div>
              </RadioGroup>
            </div>
            <div className='space-y-2'>
              <Label>手机号 *</Label>
              <Input placeholder='请输入手机号' />
              <span className='text-xs text-gray-400'>
                用于登录、预约提醒和服务通知
              </span>
            </div>
            <div className='space-y-2'>
              <Label>出生日期</Label>
              <div className='relative'>
                <Input placeholder='年/月/日' />
                <CalendarIcon className='absolute right-3 top-3 h-4 w-4 text-gray-500' />
              </div>
              <span className='text-xs text-gray-400'>
                用于计算年龄和制定理疗方案
              </span>
            </div>
            <div className='space-y-2'>
              <Label>身份证号</Label>
              <Input placeholder='请输入18位身份证号' />
              <span className='text-xs text-gray-400'>
                用于实名认证和特定项目的资格验证
              </span>
            </div>
            <div className='space-y-2'>
              <Label>客户来源</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='请选择' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='线上'>线上</SelectItem>
                  <SelectItem value='线下'>线下</SelectItem>
                  <SelectItem value='转介绍'>转介绍</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 会员信息 */}
      <Card className='rounded-2xl shadow-sm'>
        <CardContent className='space-y-4 p-6'>
          <h2 className='text-brown-700 flex items-center space-x-2 text-lg font-semibold'>
            <span>🪪</span>
            <span>会员信息</span>
          </h2>
          <RadioGroup defaultValue='否' className='flex space-x-6'>
            <div className='flex items-center space-x-1'>
              <RadioGroupItem value='否' id='no' />
              <Label htmlFor='no'>否</Label>
            </div>
            <div className='flex items-center space-x-1'>
              <RadioGroupItem value='是' id='yes' />
              <Label htmlFor='yes'>是</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* 健康状况 */}
      <Card className='rounded-2xl shadow-sm'>
        <CardContent className='space-y-6 p-6'>
          <h2 className='text-brown-700 flex items-center space-x-2 text-lg font-semibold'>
            <span>❤️‍🩹</span>
            <span>健康状况</span>
          </h2>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label>主要健康问题</Label>
              <Textarea placeholder='请描述客户主要的健康问题或不适症状...' />
              <span className='text-xs text-gray-400'>
                例如：颈椎疼痛、失眠、湿气重等
              </span>
            </div>
            <div className='space-y-2'>
              <Label>既往病史</Label>
              <Textarea placeholder='请记录客户的既往重大病史...' />
              <span className='text-xs text-gray-400'>
                例如：高血压、糖尿病、心脏病等
              </span>
            </div>
            <div className='space-y-2'>
              <Label>理疗禁忌</Label>
              <div className='grid grid-cols-3 gap-4'>
                {['孕妇', '高血压', '心脏病', '皮肤病', '出血倾向', '其他'].map(
                  (item) => (
                    <div key={item} className='flex items-center space-x-2'>
                      <Checkbox id={item} />
                      <Label htmlFor={item}>{item}</Label>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 联系信息 */}
      <Card className='rounded-2xl shadow-sm'>
        <CardContent className='space-y-6 p-6'>
          <h2 className='text-brown-700 flex items-center space-x-2 text-lg font-semibold'>
            <span>📍</span>
            <span>联系信息</span>
          </h2>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label>电子邮箱</Label>
              <Input placeholder='请输入电子邮箱' />
            </div>
            <div className='space-y-2'>
              <Label>居住地址</Label>
              <Input placeholder='请输入详细居住地址' />
            </div>
            <div className='space-y-2'>
              <Label>紧急联系人</Label>
              <Input placeholder='请输入紧急联系人姓名' />
            </div>
            <div className='space-y-2'>
              <Label>紧急联系电话</Label>
              <Input placeholder='请输入紧急联系人电话' />
            </div>
            <div className='col-span-2 space-y-2'>
              <Label>客户备注</Label>
              <Textarea placeholder='记录客户偏好、特殊需求等信息...' />
              <span className='text-xs text-gray-400'>
                例如：偏好女性技师，对某种精油过敏
              </span>
            </div>
          </div>

          <div className='flex justify-end space-x-4'>
            <Button variant='outline'>保存草稿</Button>
            <Button variant='outline'>导入信息</Button>
            <Button>确认添加</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CustomerForm;
