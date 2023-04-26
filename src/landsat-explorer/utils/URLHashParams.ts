import { urlFns } from 'helper-toolkit-ts';

type UrlHashParamKey = '@';

type HashParams = Record<UrlHashParamKey, string>;

export const DEFAULT_HASH_PARAMS: HashParams = urlFns.parseHash();

export const setHashParam = (key: UrlHashParamKey, value: string) => {
    urlFns.updateHashParam({
        key,
        value,
    });
};
