import BannerSection from "@/components/banner/Banner";
import { defaultBannerData } from "@/lib/BannerData";

export default function Home() {
  return (
    <div>
      <BannerSection data={defaultBannerData} />
    </div>
  );
}