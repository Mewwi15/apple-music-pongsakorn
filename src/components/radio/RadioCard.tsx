// src/components/radio/RadioCard.tsx
interface RadioCardProps {
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

export const RadioCard = ({ title, subtitle, image, color }: RadioCardProps) => {
  return (
    <div className="flex flex-col group cursor-pointer w-full">
      {/* ล็อคขนาดรูปให้เป็นสี่เหลี่ยมจัตุรัสเป๊ะๆ */}
      <div 
        className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-2xl transition-transform duration-300 group-hover:scale-[1.03]"
        style={{ backgroundColor: color }}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" // ใช้ object-cover เพื่อให้รูปเต็มกรอบ
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600?text=Music+Radio';
          }}
        />
      </div>
      <h3 className="text-[15px] font-bold text-white truncate px-1">{title}</h3>
      <p className="text-[14px] text-gray-500 truncate px-1 leading-tight">{subtitle}</p>
    </div>
  );
};