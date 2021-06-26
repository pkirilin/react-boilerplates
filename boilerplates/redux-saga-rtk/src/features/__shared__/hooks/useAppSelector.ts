import { createSelectorHook } from 'react-redux';
import { RootState } from '../../../store';

const useAppSelector = createSelectorHook<RootState>();

export default useAppSelector;
