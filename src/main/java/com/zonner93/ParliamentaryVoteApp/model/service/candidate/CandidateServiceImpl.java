package com.zonner93.ParliamentaryVoteApp.model.service.candidate;

import com.zonner93.ParliamentaryVoteApp.model.entity.Candidate;
import com.zonner93.ParliamentaryVoteApp.model.entity.Election;
import com.zonner93.ParliamentaryVoteApp.model.entity.User;
import com.zonner93.ParliamentaryVoteApp.model.entity.VoteResult;
import com.zonner93.ParliamentaryVoteApp.model.exception.candidate.CandidateError;
import com.zonner93.ParliamentaryVoteApp.model.exception.candidate.CandidateException;
import com.zonner93.ParliamentaryVoteApp.model.exception.election.ElectionError;
import com.zonner93.ParliamentaryVoteApp.model.exception.election.ElectionException;
import com.zonner93.ParliamentaryVoteApp.model.exception.user.UserError;
import com.zonner93.ParliamentaryVoteApp.model.exception.user.UserException;
import com.zonner93.ParliamentaryVoteApp.model.repository.CandidateRepository;
import com.zonner93.ParliamentaryVoteApp.model.repository.ElectionRepository;
import com.zonner93.ParliamentaryVoteApp.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CandidateServiceImpl implements CandidateService {

    private final CandidateRepository candidateRepository;
    private final ElectionRepository electionRepository;
    private final UserRepository userRepository;

    @Override
    public void createCandidate(Candidate candidate) {
        candidateRepository.save(candidate);
    }

    @Override
    public void deleteCandidate(long id) {
        validateIfCandidateExists(id);
        candidateRepository.deleteById(id);
    }

    @Override
    public Candidate getCandidate(long id) {
        validateIfCandidateExists(id);
        return candidateRepository.findById(id);
    }

    @Override
    public List<Candidate> getElectionCandidates(long electionId) {
        validateIfElectionExists(electionId);
        Election election = electionRepository.findById(electionId);
        return election.getCandidateList();
    }

    @Override
    public void patchCandidate(long id, Candidate candidate) {
        validateIfCandidateExists(id);
        String politicalGroup = candidate.getPoliticalGroup();
        if (Objects.nonNull(politicalGroup)) {
            candidate.setPoliticalGroup(politicalGroup);
        }
        Integer listPosition = candidate.getListPosition();
        if (Objects.nonNull(listPosition)) {
            candidate.setListPosition(listPosition);
        }
        String firstName = candidate.getFirstName();
        if (Objects.nonNull(firstName)) {
            candidate.setFirstName(firstName);
        }
        String lastName = candidate.getLastName();
        if (Objects.nonNull(lastName)) {
            candidate.setLastName(lastName);
        }
        String personalIdNumber = candidate.getPersonalIdNumber();
        if (Objects.nonNull(personalIdNumber)) {
            candidate.setPersonalIdNumber(personalIdNumber);
        }
        List<VoteResult> voteResultsList = candidate.getVoteResultsList();
        if (Objects.nonNull(voteResultsList)) {
            candidate.setVoteResultsList(voteResultsList);
        }
        candidateRepository.save(candidate);
    }

    @Override
    public long getVoteCount(long id) {
        if (!candidateRepository.existsById(id)) {
            throw new CandidateException(CandidateError.CANDIDATE_DOES_NOT_EXISTS);
        }
        return candidateRepository.findById(id).getVoteResultsList().size();
    }

    @Override
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    @Override
    public void voteForCandidate(long candidateId, Authentication authentication) {
        validateId(candidateId);
        validateIfCandidateExists(candidateId);
        Candidate currentCandidate = candidateRepository.findById(candidateId);
//        TODO: Rzucić wyjątkiem gdy authentication jest nullem
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail).get(0);
        validateIfUserAlreadyVotedForGivenCandidate(candidateId, user);

        VoteResult voteResult = new VoteResult();
        voteResult.setTimestamp(LocalDateTime.now());
        voteResult.setCandidateId(currentCandidate.getId());
        voteResult.setUserId(user.getId());


        user.getVoteResults().add(voteResult);
        userRepository.save(user);

        currentCandidate.getVoteResultsList().add(voteResult);
        candidateRepository.save(currentCandidate);
    }

    protected void validateIfCandidateExists(long id) {
        if (!candidateRepository.existsById(id)) {
            throw new CandidateException(CandidateError.CANDIDATE_DOES_NOT_EXISTS);
        }
    }

    protected void validateIfElectionExists(long electionId) {
        if (!electionRepository.existsById(electionId)) {
            throw new ElectionException(ElectionError.ELECTION_DOES_NOT_EXISTS);
        }
    }

    protected void validateId(long id) {
        if (id < 0) {
            throw new CandidateException(CandidateError.INVALID_ID);
        }
    }

    protected void validateIfUserAlreadyVotedForGivenCandidate(long candidateId, User user) {
        for (VoteResult voteResult : user.getVoteResults()) {
            if (voteResult.getCandidateId() == candidateId) {
                throw new UserException(UserError.USER_HAS_ALREADY_VOTED_FOR_THIS_CANDIDATE);
            }
        }
    }
}
