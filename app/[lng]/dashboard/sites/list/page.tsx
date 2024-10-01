import SitesList from "@/[lng]/components/Site/SitesList";
import { PageProps } from "@/types";

export default function SitesListPage({ params: { lng } }: PageProps) {

  return <SitesList lng={lng}/>;
}
