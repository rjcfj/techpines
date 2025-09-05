<?php

namespace App\Http\Controllers\API;

use App\Models\Musica;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Http\Resources\MusicaResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\Exception;
use GuzzleHttp\Client;

class MusicaController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $musicas = Musica::all();

        return $this->sendResponse(MusicaResource::collection($musicas), 'Musicas encontrado com sucesso.');
    }

    /**
     * Display a listing top 5 of the resource.
     */
    public function indexTop5(): JsonResponse
    {
        $musicas = Musica::orderBy('visualizacoes', 'DESC')->limit(5)->get();

        return $this->sendResponse(MusicaResource::collection($musicas), 'Musicas encontrado com sucesso.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make(
            $input,
            [
                'titulo' => 'required',
                'visualizacoes' => 'required|integer',
                'youtube_id' => 'required',
                'thumb' => 'required|url'
            ],
            [
                'titulo.required' => 'O campo Título é obrigatório.',
                'visualizacoes.required' => 'O campo Visualizações é obrigatório.',
                'youtube_id.required' => 'O campo Dados de Nascimento é obrigatório. ',
                'thumb.required' => 'O campo URL de Imagem do Youtube é obrigatório.',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Erro de validação', $validator->errors());
        }

        $musica = Musica::create($input);

        return $this->sendResponse(new MusicaResource($musica), 'Musica criada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Musica $musica): JsonResponse
    {
        $musica = Musica::find($musica->id);

        if (is_null($musica)) {
            return $this->sendError('Musica não encontrado.');
        }

        $musica = [
            'id' => $musica->id,
            'titulo' => $musica->titulo,
            'visualizacoes' => $musica->visualizacoes,
            'youtube_id' => $musica->youtube_id,
            'thumb' => $musica->thumb,
            'created_at' => $musica->created_at->format('d/m/Y'),
            'updated_at' => $musica->updated_at->format('d/m/Y'),
        ];

        return $this->sendResponse($musica, 'Musica encontrado com sucesso.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Musica $musica): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make(
            $input,
            [
                'titulo' => 'required',
                'visualizacoes' => 'required|integer',
                'youtube_id' => 'required',
                'thumb' => 'required|url'
            ],
            [
                'titulo.required' => 'O campo Título é obrigatório.',
                'visualizacoes.required' => 'O campo Visualizações é obrigatório.',
                'youtube_id.required' => 'O campo Dados de Nascimento é obrigatório. ',
                'thumb.required' => 'O campo URL de Imagem do Youtube é obrigatório.',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Erro de validação', $validator->errors());
        }

        $musica->titulo = $input['titulo'];
        $musica->visualizacoes = $input['visualizacoes'];
        $musica->youtube_id = $input['youtube_id'];
        $musica->thumb = $input['thumb'];
        $musica->save();

        return $this->sendResponse(new MusicaResource($musica), 'Musica atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Musica $musica): JsonResponse
    {
        $musica->delete();

        return $this->sendResponse([], 'Musica excluído com sucesso!');
    }

    /**
     * Store a newly created and link resource in storage.
     */

    public function fetchYouTubeInfo(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'youtube_url' => 'required|url'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Erro de validação', $validator->errors());
        }

        $url = $request->input('youtube_url');

        try {

            $youtubeId = $this->extractVideoId($url);
            if (!$youtubeId) {
                return $this->sendError('URL do YouTube inválida', $validator->errors());
            }

            $videoInfo = $this->getVideoInfo($youtubeId);

            $musica = Musica::create($videoInfo);

            return $this->sendResponse(new MusicaResource($musica), 'Informações do vídeo do YouTube salvas com sucesso.');
        } catch (\Exception $e) {
            return $this->sendError('Erro ao buscar informações do vídeo do YouTube: ' . $e->getMessage());
        }
    }

    function extractVideoId($url)
    {
        $videoId = null;

        // Padrões de URL do YouTube
        $patterns = [
            '/youtube\.com\/watch\?v=([^&]+)/', // youtube.com/watch?v=ID
            '/youtu\.be\/([^?]+)/',            // youtu.be/ID
            '/youtube\.com\/embed\/([^?]+)/',   // youtube.com/embed/ID
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                $videoId = $matches[1];
                break;
            }
        }

        return $videoId;
    }

    function getVideoInfo($videoId)
    {
        $client = new Client([
            'base_uri' => 'https://www.youtube.com',
            'headers' => [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            ],
            'verify' => true, // SSL ativo
            'http_errors' => false // não lançar exception automática
        ]);

        $response = $client->get('/watch', [
            'query' => ['v' => $videoId]
        ]);

        $html = (string) $response->getBody();

        if (empty($html)) {
            return $this->sendError('Erro ao acessar o YouTube');
        }

        // Extrair JSON ytInitialPlayerResponse
        if (!preg_match('/var ytInitialPlayerResponse = ({.*?});/', $html, $matches)) {
            return $this->sendError('Erro ao acessar o YouTube');
        }

        $jsonData = json_decode($matches[1], true);

        if (!$jsonData) {
            return $this->sendError('Erro ao decodificar os dados do vídeo');
        }

        $title = $jsonData['videoDetails']['title'] ?? 'Título indisponível';
        $views = isset($jsonData['videoDetails']['viewCount'])
            ? (int)$jsonData['videoDetails']['viewCount']
            : 0;

        return [
            'titulo' => $title,
            'visualizacoes' => $views,
            'youtube_id' => $videoId,
            'thumb' => 'https://img.youtube.com/vi/' . $videoId . '/hqdefault.jpg'
        ];
    }
}
