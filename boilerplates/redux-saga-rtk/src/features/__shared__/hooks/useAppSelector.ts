import { createSelectorHook } from 'react-redux';
import { RootState } from '../../../app/store';

const useAppSelector = createSelectorHook<RootState>();

export default useAppSelector;
