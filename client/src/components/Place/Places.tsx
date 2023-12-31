import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Place from './Place';
import Tabs from '../Utils/Tabs';
import Header from '../Utils/Header';
import NotFound from '../Utils/NotFound';
import Searchbar from '../Utils/Searchbar';
import useQuery from '../../hooks/useQuery';
import { State } from '../../interfaces/store';
import { title, para, createLink } from '../../constants/place';
import SkeletonLoader from '../Loader/SkeletonLoader/SkeletonLoader';
import {
    trending,
    your_places,
    new_to_you,
    booked,
    Trending,
    Your_Places,
    New_to_you,
    Booked
} from '../../constants/tab';
import {
    to,
    PLACE
} from '../../constants/place';
import { RESET_PAGE } from '../../constants/action';
import { Place as PlaceType } from '../../interfaces/place';
import { isSearching } from '../../functions/util';
import {
    getPosts,
    getMorePosts,
    searchPosts,
    getMoreSearchedPosts
} from '../../functions/place';

const Places: React.FC = () => {
    const { tab, name, location: searchedLocation } = useQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: any = useDispatch();
    const type = (searchedLocation && 'location') || 'name';
    const value = name || searchedLocation || '';
    const [activeTab, setActiveTab] = useState(tab || trending);
    const [searchType, setSearchType] = useState(type);
    const [searchValue, setSearchValue] = useState(value);;

    const morePosts = () => {
        if(isSearching(location)) {
            getMoreSearchedPosts(dispatch, activeTab, searchType, searchValue, page, limit);
        } else {
            getMorePosts(dispatch, activeTab, page, limit);
        }
    };

    const changeActiveTab = (tab: string) => {
        if(activeTab === tab && !isSearching(location)) return;
        navigate(`/places?tab=${tab}`);
        setActiveTab(tab);
    };

    useEffect(() => {
        document.title = 'Places - Happenify';
        if(isSearching(location)) searchPosts(dispatch, activeTab, searchType, searchValue, limit);
        else if(!location.search.includes('tab')) navigate('/places?tab=trending');
        else getPosts(dispatch, activeTab, limit);

        return () => {
            dispatch({ type: RESET_PAGE, for: PLACE });
        };
    }, [location]);

    const { user } = useSelector((state: State) => state.auth);
    const { places, isLoading, totalPages, page, limit } = useSelector((state: State) => state.place);

    return (
        <div className='px-3 py-2 h-full bg-dim'>
            <Header
                title={title}
                para={para}
                createLink={createLink}
            />

            <Searchbar
                tab={activeTab}
                to={to}
                searchType={searchType}
                setSearchType={setSearchType}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            <div className='p-4 mt-4 bg-white shadow-box rounded-lg'>
                <Tabs
                    activeTab={activeTab}
                    changeActiveTab={changeActiveTab}
                    value1={trending}
                    value2={your_places}
                    value3={new_to_you}
                    value4={booked}
                    option1={Trending}
                    option2={Your_Places}
                    option3={New_to_you}
                    option4={Booked}
                />

                {isLoading && <SkeletonLoader />}

                {places?.length ? (
                    <ul className='mt-5'>
                        <InfiniteScroll
                            dataLength={places.length}
                            next={morePosts}
                            hasMore={page <= totalPages}
                            loader={<SkeletonLoader />}
                            scrollThreshold={'100px'}
                        >
                            {places.map((place: PlaceType, index: number) => (
                                <Place
                                    key={place._id}
                                    isLast={index === places.length - 1}
                                    userId={user?._id}
                                    _id={place._id}
                                    name={place.name}
                                    location={place.location}
                                    capacity={place.capacity}
                                    description={place.description}
                                    type={place.type}
                                    contact={place.contact}
                                    images={place.images}
                                    facilities={place.facilities}
                                    ratings={place.ratings}
                                    owner={place.owner}
                                    pricePerHour={place.pricePerHour}
                                    termsAndConditions={place.termsAndConditions}
                                    socialMedia={place.socialMedia}
                                    createdAt={place.createdAt}
                                    dispatch={dispatch}
                                />
                            ))}
                        </InfiniteScroll>
                    </ul>
                ) : (
                    <>
                        {!isLoading && <NotFound message='No places' />}
                    </>
                )}
            </div>
        </div>
    )
};

export default Places;