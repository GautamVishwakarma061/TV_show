import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { showsQueryChangeAction } from "../slices/shows";
import SearchBar from "../Components/SearchBar";
import ShowCards from "../Components/ShowCards";
import {
  showsLoadingSelector,
  showsQuerySelector,
  showsSelector,
} from "../Selectors/Shows";
import { State } from "../store";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowsList_PageProps = ReduxProps;

const ShowsList_Page: FC<ShowsList_PageProps> = ({
  query,
  shows,
  queryChange,
  loading,
}) => {
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-col w-full">
          <SearchBar
            value={query}
            onChange={(e) => {
              queryChange(e.target.value);
            }}
          />
          {loading && <LoadingSpinner />}
        </div>
        {shows && (
          <div className="flex flex-wrap justify-center">
            {shows.map((s) => (
              <ShowCards key={s.id} show={s}></ShowCards>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: State) => {
  return {
    query: showsQuerySelector(state),
    shows: showsSelector(state),
    loading: showsLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  queryChange: showsQueryChangeAction,
};

type ReduxProps = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ShowsList_Page);
