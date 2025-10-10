export function useFormatDate() {
  const formatDateForId = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  // 辅助函数
  const formatDateReadable = (iso?: string) => {
    if (!iso) return '--';
    const d = new Date(iso);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${weekdays[d.getDay()]}`;
  };

  return {
    formatDateForId,
    formatDateReadable,
  };
}
