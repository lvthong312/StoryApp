import { useInfiniteQuery } from 'react-query';
import { useCallback, useMemo, useState } from 'react';
import AxiosInstance from '../axios/AxiosInstance';

type Params<F> = {
    key: any;
    url: string;
    limit?: number;
    filters?: F;
};

export const useInfiniteScroll = <T = unknown, F = object>({
    key,
    url,
    limit = 20,
    filters,
}: Params<F>) => {
    const queryKey: any = [...key]
    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryFn = async ({ pageParam = 1 }) => {
        const { data } = await AxiosInstance.post<T[]>(url, {
            offset: pageParam,
            limit,
            ...filters,
        });
        return {
            data: data,
            nextPage: pageParam + 1,
        };
    };
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
        queryKey,
        queryFn,
        initialPageParam: 1,
        getNextPageParam: (lastPage: any,  lastPageParam: number) => {
            if (lastPage.data.length < limit) {
                return undefined;
            }
            return lastPage.nextPage;
        },
        getPreviousPageParam: (prevPage: any, firstPageParam: number) => {
            if (firstPageParam === 1) {
                return undefined;
            }
            return prevPage.nextPage - 1;
        },
    });

    const loadNext = useCallback(() => {
        hasNextPage && fetchNextPage();
    }, [fetchNextPage, hasNextPage]);

    const onRefresh = useCallback(() => {
        if (!isRefreshing) {
            setIsRefreshing(true);
            refetch()
                .then(() => setIsRefreshing(false))
                .catch(() => setIsRefreshing(false));
        }
    }, [isRefreshing, refetch]);

    const flattenData = useMemo(() => {
        return data?.pages.flatMap(page => page.data) || [];
    }, [data?.pages]);

    return {
        data: flattenData,
        onEndReached: loadNext,
        isRefreshing,
        onRefresh,
        isFetchingNextPage
    };
};