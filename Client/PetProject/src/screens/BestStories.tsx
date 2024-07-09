import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { IStory, IStoryScroll } from '../modal/StoryModel';
import StoryHorizontal from '../components/StoryHorizontal';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { STORY_DETAIL_SCREEN } from '../constants/ScreenKey';
import { GET_BEST_STORIES_API } from '../services/ApiUrl';
const BestStories = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { data: bestStories, isRefreshing, onRefresh, onEndReached, isFetchingNextPage }: IStoryScroll =
    useInfiniteScroll({
      url: GET_BEST_STORIES_API,
      limit: 20,
      key: ['beststories'],
    });

  const onPressStory = useCallback((story: IStory) => {
    navigation.navigate(STORY_DETAIL_SCREEN, { story: story });
  }, []);

  const renderItem = useCallback(({ item }: { item: number; index: number }) => {
    return <StoryHorizontal storyId={item} onPressStory={onPressStory} />;
  }, []);

  function keyExtractor(item: number, index: number) {
    return `bestStories_${item}_${index}`;
  }

  return (
    <View>
      <FlatList
        data={bestStories}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={8}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        ListFooterComponent={
          <View style={styles.listFooterComponent}>
            {isFetchingNextPage && <ActivityIndicator />}
          </View>
        }
      />
    </View>
  );
};

export default BestStories;

const styles = StyleSheet.create({
  listEmptyComponent: {
    flexDirection: 'row',
  },
  listFooterComponent: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 60,
    width: '100%',
  },
  contentContainerStyle: {
    marginTop: 10,
    // padding: 10,
  },
});
