import { getSearchIndex } from '@/app/lib/search';
import SearchModal from './SearchModal';

export default function Search() {
  const data = getSearchIndex();
  return <SearchModal data={data} />;
}
