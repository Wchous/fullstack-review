import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <thread>
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>URL</th>
          <th>Stars</th>
        </tr>
      </thread>
      <tbody>
      {props.repos.map(function(repo){
        return (
          <tr key={repo._id}>
            <td>{repo.id}</td>
            <td>{repo.name}</td>
            <td><a href={repo.url}>{repo.url}</a></td>
            <td>{repo.stars}</td>
          </tr>
        )
      })}
    </tbody>
    </table>
  </div>
)

export default RepoList;