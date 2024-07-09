import { ActivityIndicator, Linking, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { IStory, IStoryScroll } from '../modal/StoryModel';
import { Card } from '@rneui/themed';
import { FlatList } from 'react-native';
import Comment from '../components/Comment';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import images from '../assets';
import TimeCard from '../components/TimeCard';
import { GET_STORY_COMMENTS_API } from '../services/ApiUrl';
interface IProps {
  navigation: any;
  route: {
    params: {
      story: IStory;
    };
  };
}
const StoryDetail = (props: IProps) => {
  const story = props?.route?.params?.story;
  const {
    data: newStories,
    isRefreshing,
    onRefresh,
    onEndReached,
    isFetchingNextPage,
  }: IStoryScroll = useInfiniteScroll({
    url: GET_STORY_COMMENTS_API,
    limit: 5,
    key: 'comments',
  });

  const renderItem = useCallback(({ item }: { item: number; index: number }) => {
    return (
      <Card>
        <Comment storyId={item} count={0} />
      </Card>
    );
  }, []);

  function keyExtractor(item: number, index: number) {
    return `Comments_${item}_${index}`;
  }

  function ListHeaderComponent() {
    return (
      <View>
        <Card>
          <Pressable onPress={() => Linking.openURL(story?.url)}>
            {({ pressed }) => (
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: pressed ? 'red' : 'blue',
                  paddingVertical: 8
                }}
              >
                Reference
              </Text>
            )}
          </Pressable>
          <TimeCard time={story?.time} score={story?.score} style={{ marginBottom: 20 }} />
          <Card.Title>{story?.title}</Card.Title>
          <Card.Image
            style={{ padding: 0, height: 300, resizeMode: 'cover' }}
            source={story?.id % 2 ? images.im_ai : images.im_technogogy}
          />
          <Text>{story.text}</Text>
        </Card>
        <Text style={{ marginTop: 12, fontWeight: 'bold', fontSize: 24, marginLeft: 12 }}>Comments</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={newStories}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
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

export default StoryDetail;

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
  },
});
