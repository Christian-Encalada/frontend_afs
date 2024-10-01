import SitesManageList from "@/[lng]/components/Site/SitesManageList";
import { PageProps } from "@/types";

export default function SitesManagePage({ params: { lng } }: PageProps) {

  return <SitesManageList lng={lng}/>;
}
