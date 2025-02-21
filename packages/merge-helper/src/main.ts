import { CellMerger } from './cellMerger';
import * as constants from './models/cellMerger/cellMerger.constants';
import { Mode } from './models/cellMerger/cellMerger.enums';
import {
  getMergedData,
  splitIntoFragments,
  getSortNo,
  getFieldSpan,
} from './api';

export {
  CellMerger,
  constants,
  Mode,
  getFieldSpan,
  getMergedData,
  splitIntoFragments,
  getSortNo,
};
